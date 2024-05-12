import {FC} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {publicRoutes} from "../routes/routes";

const AppRouter: FC = () => {
    return (
        <Routes>
            {publicRoutes.map((route) => (
                <Route
                    path={route.path}
                    element={<route.component/>}
                    key={route.path}
                />
            ))}
            <Route
                path="*"
                element={<Navigate to='/' replace/>}
            />

        </Routes>
    );
};

export default AppRouter;