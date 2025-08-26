import MessageBox from "sap/m/MessageBox";
import BaseController from "./BaseController";

/**
 * @namespace com.john.ui5.ts.app1.controller
 */
export default class Main extends BaseController {
	public sayHello(): void {
		MessageBox.show("Hello World!");
	}

	public onOpenDetail(): void {
		// navigate to detail route; wizard should initialize on Detail.onInit/onRouteMatched
		this.navTo("detail");
	}
}
