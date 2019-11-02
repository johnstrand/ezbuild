import { Branch } from "../../../utils/ApiTypes";

interface State {
    visible: boolean;
    branches: Branch[];
    branch: string;
    loading: boolean;
}

export type BuildQueueReducer = (
    state: State,
    action: Partial<State> //{ type: K; value: State[K] }
) => State;

export const buildQueueReducer: BuildQueueReducer = (
    state: State,
    action: Partial<State> //{ type: K; value: State[K] }
) => {
    return { ...state, ...action };
};
