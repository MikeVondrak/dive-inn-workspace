const copy = () => ({
  reservations: {
    email: {
      subject: 'Ahoy Mate! Your reservation request has been received.',
      intro:
        "Thank you for choosing the Dive Inn to host your event, we're excited to help you throw an epic party!",
      requestReceived:
        'We have received your request, and you will receive another email confirming your reservation, usually within 24-48 hours (please reach out if you do not hear from us).',
      weatherGroupSize:
        'Your dedicated space for the event will depend on your group size and the weather.',
      features: {
        header: 'Features:',
        noCharge: 'NO charge to rent the space!',
        noDrinkMin: 'NO drink minimums!',
        under21til6: 'Under 21 allowed until 6:00 PM',
        boatGroup13:
          'Groups up to 13 people in the Boat, and larger spaces for parties of 15-250+',
      },
      reviewRequest:
        "All we ask in return is for you to kindly ask your guests to leave us a 5-star review on their favorite social media site (Facebook, Google, Yelp, TripAdvisor... we're not picky!)",
      doNots: {
        header: 'IMPORTANT:',
        noMovingTables: 'Absolutely NO moving chairs or tables',
        noReserveGames:
          'No reserving games - first come, first served! (Pool, ping pong, cornhole)',
        noOutsideFood: 'No outside food',
      },
      detailsHeader: 'Your Reservation Request:',
    },
  },
});

export default copy;
