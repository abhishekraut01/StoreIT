'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useState } from 'react'
import Image from 'next/image'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { Input } from '@/components/ui/input'
import Link from 'next/link'

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: 'Full name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Enter a valid email.',
  }),
})

type AuthFormProps = {
  type: 'sign-in' | 'sign-up'
}

const AuthForm = ({ type }: AuthFormProps) => {
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)
    console.log(values)
    setTimeout(() => setLoading(false), 1500)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form">
        <h1 className="form-title">{type === 'sign-up' ? 'Sign Up' : 'Sign In'}</h1>

        {type === 'sign-up' && (
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <div className="shad-form-item">
                  <FormLabel className="shad-from-label">Full Name</FormLabel>
                  <FormControl>
                    <Input className="shad-input" placeholder="Enter your full name" {...field} />
                  </FormControl>
                </div>
                <FormMessage className="shad-form-message" />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <div className="shad-form-item">
                <FormLabel className="shad-from-label">Email</FormLabel>
                <FormControl>
                  <Input className="shad-input" placeholder="Enter your email" {...field} />
                </FormControl>
              </div>
              <FormMessage className="shad-form-message" />
            </FormItem>
          )}
        />

        <Button className="form-submit-button" type="submit" disabled={loading}>
          {type === 'sign-in' ? 'Sign In' : 'Sign Up'}
          {loading && (
            <Image
              src="/assets/icons/loader.svg"
              alt="Loading..."
              width={25}
              height={25}
              className="ml-2"
            />
          )}
        </Button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="body-2 flex justify-center">
          <p className="text-white-100">
            {type === 'sign-in' ? "Don't have an account" : 'Already have an account'}
          </p>

          <Link
            className="ml-1 font-medium text-brand"
            href={type === 'sign-in' ? '/sign-up' : 'sign-in'}
          >
            {type === 'sign-in' ? 'Signup' : 'Signin'}
          </Link>
        </div>
      </form>
    </Form>
  )
}

export default AuthForm
