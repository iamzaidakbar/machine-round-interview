import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import App from "../App";

const CShapedUI = lazy(() => import("../Examples/CShapedUI/CShapedUI"));
const StarRating = lazy(() => import("../Examples/StarRating/StarRating"));
const TrafficLight = lazy(() => import("../Examples/TrafficLight/TrafficLight"));
const NestedComments = lazy(() => import("../Examples/NestedComments/NestedComments"));
const MarkAndShift = lazy(() => import("../Examples/MarkAndShift/MarkAndShift"));



const Router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: "/c_shaped_ui",
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <CShapedUI />
                    </Suspense>
                ),
            },
            {
                path: "/star_rating",
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <StarRating />
                    </Suspense>
                ),
            },
            {
                path: "/traffic_light_system",
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <TrafficLight />
                    </Suspense>
                ),
            },
            {
                path: "/nested_comments",
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <NestedComments />
                    </Suspense>
                ),
            },
            {
                path: "/mark_and_shift",
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <MarkAndShift />
                    </Suspense>
                ),
            },
        ]
    },

]);
export default Router