import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebase";

export async function authenticateGmail() {
  const provider = new GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/gmail.send');
  provider.addScope('https://www.googleapis.com/auth/gmail.readonly');
  provider.addScope('https://www.googleapis.com/auth/gmail.modify');
  
  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const accessToken = credential?.accessToken;
    if (!accessToken) {
      throw new Error("Access token could not be retrieved from Google Auth.");
    }
    return {
      user: result.user,
      accessToken
    };
  } catch (error: any) {
    console.error("Gmail Authentication Error:", error);
    throw error;
  }
}

export async function sendGmailMessage(accessToken: string, to: string, subject: string, body: string) {
  const emailLines = [
    `To: ${to}`,
    `Subject: =?UTF-8?B?${btoa(unescape(encodeURIComponent(subject)))}?=`,
    `Content-Type: text/plain; charset="UTF-8"`,
    ``,
    body
  ];
  const email = emailLines.join("\r\n");
  const base64EncodedEmail = btoa(unescape(encodeURIComponent(email)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  const response = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages/send`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      raw: base64EncodedEmail
    })
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error?.message || 'Gagal mengirim email melalui Gmail API');
  }

  return await response.json();
}

export async function fetchGmailMessages(accessToken: string) {
  const response = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=10`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });

  if (!response.ok) {
    throw new Error('Gagal mengambil pesan dari Gmail');
  }

  const data = await response.json();
  const messages = data.messages || [];

  const detailedMessages = await Promise.all(messages.map(async (msg: any) => {
    try {
      const res = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${msg.id}`, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
      return await res.json();
    } catch (e) {
      return null;
    }
  }));

  return detailedMessages.filter(Boolean);
}
