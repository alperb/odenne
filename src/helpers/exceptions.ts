export enum Exceptions {
    UNDEFINED_OPTIONS = '[UNDEFINED_OPTIONS] Odenne Options are not defined/given or malformed.',
    PREPARE_FAILED = '[PREPARE_FAILED] Preparation phase of Odenne has failed. Error is logged in `Odenne.status.error`',
    START_STATUS_CHECK_FAILED = '[START_STATUS_CHECK_FAILED] Odenne start status check failed to validate status as `PREPARING`',
    ROUND_CREATION_FAILURE = '[ROUND_CREATION_FAILURE] Referee failed to create round since turn is not defined',
    INVALID_GAME_STATUS_FOR_ADVANCING = '[INVALID_GAME_STATUS_FOR_ADVANCING] Odenne can not advance while game status is not `STARTED`',
    COULDNT_RANDOMIZE_SKILL = '[COULDNT_RANDOMIZE_SKILL] Could not randomize a skill'
}
export default Exceptions;