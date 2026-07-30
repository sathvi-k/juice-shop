/*
 * Copyright (c) 2014-2026 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

import path from 'node:path'
import { type Request, type Response } from 'express'
import rateLimit from 'express-rate-limit'
import { challenges } from '../data/datacache'
import * as challengeUtils from '../lib/challengeUtils'

const premiumContentLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  message: 'Too many requests, please try again later.'
})

export function servePremiumContent () {
  return [premiumContentLimiter, (req: Request, res: Response) => {
    challengeUtils.solveIf(challenges.premiumPaywallChallenge, () => { return true })
    res.sendFile(path.resolve('frontend/dist/frontend/assets/private/JuiceShop_Wallpaper_1920x1080_VR.jpg'))
  }]
}
