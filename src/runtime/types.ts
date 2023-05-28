import '@hcaptcha/types'

export type HCaptchaVerificationResponse = {
  /** is the passcode valid, and does it meet security criteria you specified, e.g. sitekey? */
  success: boolean;
  /** timestamp of the challenge (ISO format yyyy-MM-dd'T'HH:mm:ssZZ) */
  challenge_ts: string;
  /** the hostname of the site where the challenge was solved */
  hostname: string;
  /** optional: whether the response will be credited */
  credit?: boolean;
  /** optional: any error codes */
  'error-codes'?: string[];
  score?: string[];
  // ENTERPRISE feature: reason(s) for score.
  score_reasone?: string[];
};

declare module 'nuxt/schema' {
  interface RuntimeConfig {
    hcaptcha: {
      secretKey: string
    },
    public: {
      hcaptcha: {
        siteKey: string
      }
    }
  }
}

export {}
