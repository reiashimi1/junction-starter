module.exports = async (models) => {
    const {
        User,
        Airline,
        Token,
        Document,
        Offer,
        Roulette,
        LoyaltyProgram,
        UserOffer,
        RouletteOffer,
        LoyaltyProgramOffer,
    } = models;

    // inject all models associations

    await Airline.belongsTo(User);
    await User.hasOne(Airline);
    await Token.belongsTo(User);
    await Document.belongsTo(User);
    await User.hasOne(Document);

    await Offer.belongsToMany(Roulette, { through: RouletteOffer });
    await Roulette.belongsToMany(Offer, { through: RouletteOffer });

    await Airline.hasMany(LoyaltyProgram);
    await Airline.hasMany(Offer);

    await User.belongsToMany(Offer, { through: UserOffer });
    await Offer.belongsToMany(User, { through: UserOffer });

    await LoyaltyProgram.belongsToMany(Offer, { through: LoyaltyProgramOffer });
    await Offer.belongsToMany(LoyaltyProgram, { through: LoyaltyProgramOffer });
}
