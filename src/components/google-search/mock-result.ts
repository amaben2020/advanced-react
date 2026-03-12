export const server = new Promise((resolve, reject) => {
  try {
    setTimeout(() => {
      resolve([
        { type: 'company', text: 'Facebook' },
        {
          type: 'organization',
          text: 'FasTrak',
          subtitle: 'Government office, San Francisco, CA',
        },
        { type: 'text', text: 'face' },
        { type: 'text', text: 'facebook messenger' },
        { type: 'text', text: 'facebook stock' },
        {
          type: 'television',
          text: 'Faces of COVID',
          subtitle: 'TV program',
        },
        { type: 'musician', text: 'Faces', subtitle: 'Rock band' },
        {
          type: 'television',
          text: 'Faces of Death',
          subtitle: 'Film series',
        },
      ]);
    }, 300);
  } catch (error) {
    reject('Something went wrong');
  }
});
