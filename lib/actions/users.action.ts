'use server'

import { ID, Query } from 'node-appwrite'
import { createSessionAdmin } from '../appwrite'
import { appwriteConfig } from '../appwrite/config'
import { parseStringify } from '../utils'

export const getUserByEmail = async (email: string) => {
  const { database } = await createSessionAdmin()

  const result = await database.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.userCollectionId,
    [Query.equal('email', [email])]
  )

  return result.total > 0 ? result.documents[0] : null
}

const handleError = (error: unknown, message: string) => {
  console.error(error)
  throw new Error(message)
}

export const sendOtpWithMail = async ({ email }: { email: string }) => {
  const { account } = await createSessionAdmin()

  try {
    const session = await account.createEmailToken(ID.unique(), email)
    return session.userId
  } catch (error) {
    handleError(error, 'Unable to send OTP')
  }
}

export const creeateUser = async ({ fullName, email }: { fullName: string; email: string }) => {
  try {
    // 1. Check if user already exists
    const existingUser = await getUserByEmail(email)

    if (existingUser !== null) {
      throw new Error('User already exists')
    }

    // 2. Send OTP to user's email and get account ID
    const accountId = await sendOtpWithMail({ email })

    // 3. Create user in Appwrite Database
    const { database } = await createSessionAdmin()

    await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        fullName,
        email,
        avatar:
          'https://imgs.search.brave.com/-9hA3ZQa8SdURZqiKroGf2IHaBaidw59tqlRXbS5oF8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS12ZWN0/b3IvZ2FtZXItbWFz/Y290LWdlZWstYm95/LWVzcG9ydHMtbG9n/by1hdmF0YXItd2l0/aC1oZWFkcGhvbmVz/LWdsYXNzZXMtY2Fy/dG9vbi1jaGFyYWN0/ZXJfODE2OS0yMjgu/anBnP3NlbXQ9YWlz/X2h5YnJpZCZ3PTc0/MA',
        account_id:accountId,
      }
    )

    // 4. Return clean result
    return parseStringify({ accountId })
  } catch (error) {
    handleError(error, 'Failed to create user')
  }
}
