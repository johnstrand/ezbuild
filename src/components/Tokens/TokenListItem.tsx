import React from "react";
import { OrgSettings } from "../../utils/PatStore";
import { deleteOrganization } from "../../utils/Actions";
import { ConfirmDeleteButton } from "../Common/ConfirmDeleteButton";
import { showToast } from "../../utils/AppToaster";

interface Props {
    org: OrgSettings;
}

export const TokenListItem = ({ org }: Props) => {
    return (
        <tr>
            <td>{org.name}</td>
            <td>{org.alias}</td>
            <td className="cell-right">
                <ConfirmDeleteButton
                    confirmText="Delete"
                    cancelText="Cancel"
                    onConfirm={() => {
                        deleteOrganization(org.name);
                        showToast("Organization deleted", "danger");
                    }}
                />
            </td>
        </tr>
    );
};
