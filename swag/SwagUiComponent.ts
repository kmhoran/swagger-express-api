import SwagRoute from "./SwagRoute";

interface IRoute {
    id: "";
    title: "";
    body: "";
    json: {};
}

export default class SwagUiComponent {
    public routes: SwagRoute[];
    public UiComponent() {
        this.routes = [];
    }

    public addRoute(route: SwagRoute) {
        this.routes.push(route);
        return this;
    }

    public print() {
        console.log("UI COMPONENT PRINTING");
        this.routes.forEach((route: SwagRoute) => {
            route.print();
        });
    }
}
