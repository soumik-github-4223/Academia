import React, {ReactNode} from "react";
import { Provider } from "react-redux";
import { store } from "../redux/store";

interface ProviderProps{
    children:ReactNode
}

export function Providers({children}:ProviderProps){
    return <Provider store={store}>{children}</Provider>
}

/*This file is essentially a utility to simplify the process of wrapping your app (or parts of it) with the Redux Provider. It ensures that the Redux store is available to all components within the Providers component's tree. */