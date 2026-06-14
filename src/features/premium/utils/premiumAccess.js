/**
 * Single source of truth for premium access rules.
 *
 * Free tier:
 *   - Island 1 (An toàn cá nhân): ALL 3 lessons free
 *   - Island 2 (An toàn xã hội): lesson 1 free, lessons 2–3 premium
 *   - Island 3 (An toàn môi trường): lesson 1 free, lessons 2–3 premium
 *
 * Premium: unlocks ALL content across every island.
 */

/**
 * Returns true if the situation requires a premium subscription.
 *
 * Works for both API-driven situations (with islandId + orderIndex)
 * and the static fallback dataset.
 *
 * @param {{ situationId?: number|string, islandId?: number|string, orderIndex?: number|string }} situation
 * @returns {boolean}
 */
export function doesSituationRequirePremium(situation) {
  if (!situation) return false;

  const islandId = Number(situation.islandId);
  const orderIndex = Number(situation.orderIndex);

  // Island 1 is entirely free
  if (islandId === 1) return false;

  // For all other islands, only the first lesson (orderIndex 1) is free
  if (Number.isInteger(orderIndex) && orderIndex > 0) {
    return orderIndex > 1;
  }

  // Fallback: use the hardcoded free situationId set when metadata is missing
  const freeSituationIds = new Set([1, 2, 3, 4, 7]);
  const situationId = Number(situation.situationId);

  return Number.isInteger(situationId) && situationId > 0
    ? !freeSituationIds.has(situationId)
    : false;
}
