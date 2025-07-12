"user server"

import { Account, Avatars, Client, Databases, Storage } from 'node-appwrite'
import { appwriteConfig } from './config'
import { cookies } from 'next/headers'

export const createSessionClient = async () => {
  const client = new Client()

  client
    .setEndpoint(appwriteConfig.endpointUrl) // Your API Endpoint
    .setProject(appwriteConfig.projectId) // Your project ID

  const session = (await cookies()).get('appwrite-session')

  if (!session || !session.value) throw new Error('no session found')

    client.setSession(session.value)

    return {
        get account(){
            return new Account(client)
        },

        get database(){
            return new Databases(client)
        }
    }
}


export const createSessionAdmin = async () => {
  const client = new Client()

  client
    .setEndpoint(appwriteConfig.endpointUrl) // Your API Endpoint
    .setProject(appwriteConfig.projectId) // Your project ID
    .setKey(appwriteConfig.secretKey)

    return {
        get account(){
            return new Account(client)
        },
        
        get database(){
            return new Databases(client)
        },

        get storage(){
            return new Storage(client)
        },
        get avatar(){
            return new Avatars(client)
        }
    }
}