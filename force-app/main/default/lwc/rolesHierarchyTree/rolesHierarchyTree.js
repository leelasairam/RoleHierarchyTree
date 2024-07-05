import { LightningElement,track,wire } from 'lwc';
import getRoleHierarchy from '@salesforce/apex/RoleHierarchyController.getRoleHierarchy';
export default class RolesHierarchyTree extends LightningElement {
    @track roles = [];

    @wire(getRoleHierarchy)
    wiredRoles({ error, data }) {
        if (data) {
            console.log(data);
            this.buildHierarchy(data);
        } else if (error) {
            console.error(error);
        }
    }

    buildHierarchy(flatRoles) {
        const roleMap = {};
        const hierarchy = [];

        // Initialize each role's children array
        flatRoles.forEach(role => {
            roleMap[role.Id] = { label:role.Name,name:role.Id,expanded:role.Name==='CEO'?true:false, items: [] };
        });

        // Build the hierarchy
        flatRoles.forEach(role => {
            if (role.ParentRoleId) {
                roleMap[role.ParentRoleId].items.push(roleMap[role.Id]);
            } else {
                hierarchy.push(roleMap[role.Id]);
            }
        });
        let temp = hierarchy;
        this.roles = temp;
        console.log(this.roles.length);
        console.log(roleMap);
        console.log(hierarchy);
    }
}