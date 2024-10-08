async getById(id) {
    const session = await Session.findById(id);
    if (!session) {
        throw new Error('Session not found');
    }
    return session;
}