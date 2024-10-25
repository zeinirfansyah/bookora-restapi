import { NextFunction, Request, Response } from 'express'
import { isLength, isStrongPassword } from 'validator'
import isEmail from 'validator/lib/isEmail'
import prisma from '../../config/prisma'

export const validateUserInput = async (req: Request, res: Response, next: NextFunction) => {
    const userData = req.body
    const userCode = req.params?.user_code

    const isPatchMethod = req.method === 'PATCH'

    if (!isPatchMethod) {
        const requiredFields = ['fullname', 'username', 'email', 'password', 'confirm_password']

        const missingFields = requiredFields.filter((field) => !userData[field])

        if (missingFields.length > 0) {
            res.status(400).send({
                status_code: 400,
                success: false,
                message: `Missing required fields: ${missingFields.join(', ')}`
            })
            return
        }
    }

    if (userData.username) {
        if (
            !isLength(userData.username, {
                min: 6,
                max: 20
            })
        ) {
            res.status(400).send({
                status_code: 400,
                success: false,
                message: 'Username must be between 6 and 20 characters'
            })
            return
        }

        // Allow letters, numbers, hyphens (-), underscores (_), and dots (.)
        const usernameRegex = /^[a-zA-Z0-9-_.]+$/
        if (!usernameRegex.test(userData.username)) {
            res.status(400).send({
                status_code: 400,
                success: false,
                message: 'Username can only contain letters, numbers, hyphens (-), underscores (_), and dots (.)'
            })

            return
        }
    }

    if (userData.email) {
        const trimEmail = userData.email.trim()
        if (!isEmail(trimEmail)) {
            res.status(400).send({
                status_code: 400,
                success: false,
                message: 'Email must be a valid email'
            })
            return
        }
    }

    if (userData.phone) {
        const trimPhone = userData.phone.trim()
        const phoneRegex = /^[0-9]+$/

        if (!phoneRegex.test(trimPhone)) {
            res.status(400).send({
                status_code: 400,
                success: false,
                message: 'Phone number must be contain only numbers'
            })
            return
        }

        if (!isLength(trimPhone, { min: 10, max: 13 })) {
            res.status(400).send({
                status_code: 400,
                success: false,
                message: 'Phone number must be between 10 and 13 characters'
            })
            return
        }
    }

    if (userData.password) {

        if (!userData.confirm_password) {
            res.status(400).send({
                status_code: 400,
                success: false,
                message: 'Confirm password is required'
            })
            return
        }

        const trimPassword = userData.password.trim()
        const trimConfirmPassword = userData.confirm_password.trim()

        if (
            !isStrongPassword(trimPassword, {
                minLength: 6,
                minLowercase: 1,
                minUppercase: 1
            })
        ) {
            res.status(400).send({
                status_code: 400,
                success: false,
                message: [
                    'Password must be at least 6 characters long',
                    'Password must contain at least one lowercase letter',
                    'Password must contain at least one uppercase letter'
                ].join(', ')
            })
            return
        }


        if (trimPassword !== trimConfirmPassword) {
            res.status(400).send({
                status_code: 400,
                success: false,
                message: 'Passwords do not match'
            })
            return
        }
    }

    if (userData.role && userData.role !== 'ADMIN' && userData.role !== 'CUSTOMER') {
        res.status(400).send({
            status_code: 400,
            success: false,
            message: "Role must be either 'ADMIN' or 'CUSTOMER'"
        })

        return
    }


    let user = null
    if (userCode) {
        user = await prisma.user.findUnique({
            where: {
                user_code: userCode
            }
        })

        if (!user) {
            res.status(404).send({
                status_code: 404,
                success: false,
                message: 'User not found'
            })
            return
        }
    }

    if (userData.username && user?.username !== userData.username) {
        const existingUser = await prisma.user.findUnique({
            where: {
                username: userData.username
            }
        })

        if (existingUser) {
            res.status(400).send({
                status_code: 400,
                success: false,
                message: 'Username already exists'
            })
            return
        }
    }

    if (userData.email && user?.email !== userData.email) {
        const existingUser = await prisma.user.findUnique({
            where: {
                email: userData.email
            }
        })

        if (existingUser) {
            res.status(400).send({
                status_code: 400,
                success: false,
                message: 'Email already exists'
            })
            return
        }
    }

    if (userData.phone && user?.phone !== userData.phone) {
        const existingUser = await prisma.user.findUnique({
            where: {
                phone: userData.phone
            }
        })

        if (existingUser) {
            res.status(400).send({
                status_code: 400,
                success: false,
                message: 'Phone number already exists'
            })
            return
        }
    }

    next()
}
