const getNavSelection = () => {
    const selectionSegments = window.location.hash
        .substring(1)
        .split("/")
        .filter(segment => segment !== "");

    return {
        tenantId: selectionSegments[0],
        organizationId: selectionSegments[1],
        projectId: selectionSegments[2],
        page: selectionSegments[3] || "builds"
    };
};

export default getNavSelection;
