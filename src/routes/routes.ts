import DeepseekMainPage from "../pages/DeepseekMainPage.tsx";
import DeepseekCoderPage from "../pages/DeepseekCoderPage.tsx";

export interface IRoute {
    path: string;
    component: React.ComponentType;
    exact ?: boolean;
}


export enum RouteNames {
    DEEPSEEK_MAIN ='/',
    DEEPSEEK_CODER = '/coder',
}

export const publicRoutes:IRoute[] = [
    {path: RouteNames.DEEPSEEK_MAIN, exact:true, component: DeepseekMainPage},
    {path: RouteNames.DEEPSEEK_CODER, exact:true, component: DeepseekCoderPage},
]

