/**
 * @typedef {Object} IslandSummary
 * @property {number} islandId
 * @property {string} name
 * @property {string | null} description
 * @property {string | null} imageUrl
 * @property {number} orderIndex
 * @property {string} status
 * @property {number} situationCount
 */

/**
 * @typedef {Object} SituationSummary
 * @property {number} situationId
 * @property {number} islandId
 * @property {string} islandName
 * @property {string} title
 * @property {string | null} intro
 * @property {number} orderIndex
 * @property {string} status
 */

/**
 * @typedef {Object} SituationStep
 * @property {number} stepId
 * @property {string} stepType
 * @property {number} orderIndex
 * @property {string | null} content
 * @property {string | null} mediaUrl
 */

/**
 * @typedef {Object} Flashcard
 * @property {number} flashcardId
 * @property {string} question
 * @property {string} optionA
 * @property {string} optionB
 * @property {string | null} questionVoiceUrl
 * @property {string | null} optionAVoiceUrl
 * @property {string | null} optionBVoiceUrl
 * @property {string} correctAnswer
 * @property {string | null} correctFeedback
 * @property {string | null} wrongFeedback
 */

/**
 * @typedef {Object} Skill
 * @property {number} skillId
 * @property {string} name
 * @property {string | null} description
 */

/**
 * @typedef {Object} ParentReviewQuestion
 * @property {number} questionId
 * @property {number} skillId
 * @property {string} questionText
 * @property {string | null} suggestedActivity
 */

/**
 * @typedef {SituationSummary & {
 *   steps: SituationStep[],
 *   flashcard: Flashcard | null,
 *   skills: Skill[],
 *   parentReview: ParentReviewQuestion | null
 * }} SituationDetail
 */

/**
 * @typedef {Object} SignedMediaUrl
 * @property {number} [stepId]
 * @property {string} bucket
 * @property {string} path
 * @property {string} signedUrl
 * @property {number} expiresInSeconds
 * @property {string} expiresAtUtc
 */

/**
 * @typedef {Object} LearningApiError
 * @property {string} name
 * @property {string} message
 * @property {number | null} status
 * @property {string | null} title
 * @property {string | null} detail
 * @property {unknown} body
 */

export {};
