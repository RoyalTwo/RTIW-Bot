export default function (type) {
    if (type == 'err') {
        return `${'\x1b[31m'}Error:${"\x1b[0m"}`;
    }
    if (type == 'suc') {
        return `${"\x1b[32m"}Success:${"\x1b[0m"}`
    }
}