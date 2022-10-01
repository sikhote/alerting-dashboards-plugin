import { i18n } from '@osd/i18n';
// import { IEmbeddable } from '../../../../src/plugins/dashboard/public/embeddable_plugin';
// import { ActionByType, IncompatibleActionError } from '../../../../src/plugins/dashboard/public/ui_actions_plugin';
// import { DASHBOARD_CONTAINER_TYPE, DashboardContainer } from '../../../../src/plugins/dashboard/public/application/embeddable';
import { IEmbeddable, ActionByType, IncompatibleActionError, DASHBOARD_CONTAINER_TYPE, DashboardContainer } from '../../../../src/plugins/dashboard/public';

export const ACTION_ALERTING = 'alerting';

function isDashboard(embeddable: IEmbeddable): embeddable is DashboardContainer {
  return embeddable.type === DASHBOARD_CONTAINER_TYPE;
}

// function isExpanded(embeddable: IEmbeddable) {
//   if (!embeddable.parent || !isDashboard(embeddable.parent)) {
//     throw new IncompatibleActionError();
//   }

//   return embeddable.id === embeddable.parent.getInput().expandedPanelId;
// }

export interface AlertingActionContext {
  embeddable: IEmbeddable;
}

export class AlertingAction implements ActionByType<typeof ACTION_ALERTING> {
  public readonly type = ACTION_ALERTING;
  public readonly id = ACTION_ALERTING;
  public order = 8;

  constructor() {}

  // @ts-ignore
  public getDisplayName({ embeddable }: AlertingActionContext) {
    if (!embeddable.parent || !isDashboard(embeddable.parent)) {
      throw new IncompatibleActionError();
    }
    return i18n.translate('dashboard.actions.alertingMenuItem.displayName', {
      defaultMessage: 'Create Monitors',
    });
  }

  // @ts-ignore
  public getIconType({ embeddable }: AlertingActionContext) {
    if (!embeddable.parent || !isDashboard(embeddable.parent)) {
      throw new IncompatibleActionError();
    }
    return 'outlierDetectionJob';
  }

  // @ts-ignore
  public async isCompatible({ embeddable }: AlertingActionContext) {
    return Boolean(embeddable.parent && isDashboard(embeddable.parent));
  }

  // @ts-ignore
  public async execute({ embeddable }: AlertingActionContext) {
    if (!embeddable.parent || !isDashboard(embeddable.parent)) {
      console.log('Alerting action is incompatible');
      throw new IncompatibleActionError();
    }

    // TODO: here is where the logic for handling the action being clicked should be handled - e.g., open some side panel
    // to construct and run an anomaly detector.
    console.log('executing Alerting action');
    console.log('embeddable: ', embeddable);

    // See below example of the expand panel action. It calls back to the parent embeddable and updates the expanded panel ID,
    // such that the subscription on the input reads this new field, updates state, and will render the specific panel
    // in an expanded fashion.

    //   const newValue = isExpanded(embeddable) ? undefined : embeddable.id;
    //   embeddable.parent.updateInput({
    //     expandedPanelId: newValue,
    //   });
  }
}
