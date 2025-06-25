'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

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

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  Email: z.string().email().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
})

type authFromT = {
  type: 'sign-in' | 'sign-up'
}

const AuthFrom = (type: authFromT) => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form">
          <h1 className="form-title">{type.type === 'sign-up' ? 'Sign Up' : 'Sign In'}</h1>
          {type.type === 'sign-up' && (
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <div className="shad-form-item">
                    <FormLabel className="shad-from-label">fullName</FormLabel>

                    <FormControl>
                      <Input className="shad-input" placeholder="Enter your fullName" {...field} />
                    </FormControl>
                  </div>
                  <FormMessage className="shad-form-message" />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="Email"
            render={({ field }) => (
              <FormItem>
                <div className="shad-form-item">
                  <FormLabel className="shad-from-label">Email</FormLabel>

                  <FormControl>
                    <Input className="shad-input" placeholder="Enter your Email" {...field} />
                  </FormControl>
                </div>
                <FormMessage className="shad-form-message" />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>

      {/* OPT VARificaltion */}
    </>
  )
}

export default AuthFrom
