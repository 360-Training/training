let id=1;
export function generateId(): number {
    return id++;
}

export function today(): Date {
    return new Date();
}