import { Branch } from "utils/ApiTypes";

interface State {
    visible: boolean;
    branches: Branch[];
    branch: string;
    loading: boolean;
}

type BuildQueueReducer = (
    state: State,
    action: Partial<State> //{ type: K; value: State[K] }
) => State;

const buildQueueReducer: BuildQueueReducer = (
    state: State,
    action: Partial<State> //{ type: K; value: State[K] }
) => {
    return { ...state, ...action };
};

export default buildQueueReducer;
