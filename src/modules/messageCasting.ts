export function bool(arg: string): boolean | null {
    const acceptableTrue = ['true', 'yes', 'y', '1', 'on'];
    const acceptableFalse = ['false', 'no', 'n', '0', 'off'];

    if (acceptableTrue.includes(arg.toLowerCase())) return true;
    else if (acceptableFalse.includes(arg.toLowerCase())) return false;
    else return null;
}