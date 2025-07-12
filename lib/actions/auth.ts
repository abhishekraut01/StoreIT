'use server'

import { creeateUser } from './users.action'

export const handleSignup = async (values: { fullName: string; email: string }) => {
  try {
    const result = await creeateUser(values)
    return { success: true, data: result }
  } catch (error: any) {
    return { success: false, error: error.message || 'Signup failed' }
  }
}
