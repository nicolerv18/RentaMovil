export function toCreateBranchPayload(formData) {
    return {
        name: formData.name,
        city: formData.city,
        phone: formData.phone,
        address: formData.address,
        schedule: formData.schedule,
    };
}

export function toUpdateBranchPayload(formData) {
    return {
        name: formData.name,
        city: formData.city,
        phone: formData.phone,
        address: formData.address,
        schedule: formData.schedule,
    };
}

export function toBranchViewModel(branch) {
    return {
        id: branch.id,
        name: branch.name,
        city: branch.city,
        phone: branch.phone,
        address: branch.address,
        schedule: branch.schedule || [],
    };
}