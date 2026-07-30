/*
 * Copyright (c) 2014-2026 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

import path from 'node:path'
import { type Request, type Response } from 'express'
import { challenges } from '../data/datacache'
import * as challengeUtils from '../lib/challengeUtils'
import rateLimit from 'express-rate-limit'

export const servePrivacyPolicyProofLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 100
})

export function servePrivacyPolicyProof () {
  return (req: Request, res: Response) => {
    challengeUtils.solveIf(challenges.privacyPolicyProofChallenge, () => { return true })
    res.sendFile(path.resolve('frontend/dist/frontend/assets/private/thank-you.jpg'))
  }
}
