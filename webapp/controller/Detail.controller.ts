import JSONModel from "sap/ui/model/json/JSONModel";
import Wizard from "sap/m/Wizard";
import BaseController from "./BaseController";

/**
 * @namespace com.john.ui5.ts.app1.controller
 */
export default class Detail extends BaseController {
    private oWizardModel: JSONModel;

    public onInit(): void {
        // create a small JSON model to track wizard state
        this.oWizardModel = new JSONModel({
            ackComplete: false,
            formComplete: false,
            paymentComplete: false,
            reviewComplete: false
        });
        this.getView().setModel(this.oWizardModel, "wizard");

        // attach route matched to reset wizard each time detail route is entered
        this.getRouter().getRoute("detail").attachPatternMatched(this._onRouteMatched, this);
    }

    private _onRouteMatched(): void {
        // reset wizard model so it starts from step 1 every time
        this.oWizardModel.setData({
            ackComplete: false,
            formComplete: false,
            paymentComplete: false,
            reviewComplete: false
        });

        // ensure wizard UI is reset to first step
        const oWizard = this.byId("orderWizard") as unknown as Wizard;
        if (oWizard) {
            try {
                // there is no official reset API; navigate to first step
                const aSteps = oWizard.getSteps();
                if (aSteps && aSteps.length > 0) {
                    oWizard.setCurrentStep(aSteps[0]);
                }
                // clear any inputs within the wizard
                const oView = this.getView();
                const oName = oView.byId("orderName");
                const oQty = oView.byId("orderQty");
                if (oName && (oName as any).setValue) {
                    (oName as any).setValue("");
                }
                if (oQty && (oQty as any).setValue) {
                    (oQty as any).setValue("");
                }
            } catch (e) {
                // ignore
            }
        }
    }

    public onCancel(): void {
        // user cancels from review page; go back to dashboard and reset wizard state
        // reset model first to ensure next entry starts fresh
        this.oWizardModel.setData({
            ackComplete: false,
            formComplete: false,
            paymentComplete: false,
            reviewComplete: false
        });

        // navigate back to main/dashboard and replace history so it feels like start over
        this.navTo("main", {}, true);
    }

    public onConfirm(): void {
        // for now, simply go to main after confirm
        this.navTo("main");
    }
}
