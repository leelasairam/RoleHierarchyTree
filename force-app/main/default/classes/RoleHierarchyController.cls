public class RoleHierarchyController {
    @AuraEnabled(cacheable=true)
    public static List<UserRole> getRoleHierarchy() {
        return [SELECT Id, Name, ParentRoleId FROM UserRole];
    }
}
