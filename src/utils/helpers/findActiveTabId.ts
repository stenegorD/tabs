export function findActiveTabId(id: number): number {
    if (id <= 1) {
        return id + 1
    }
     else {
        return id - 1
    }
}