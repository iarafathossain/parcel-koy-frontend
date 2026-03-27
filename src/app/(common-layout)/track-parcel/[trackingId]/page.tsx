type Props = {
  params: {
    trackingId: string;
  };
};

const TrackParcelByIdPage = ({ params }: Props) => {
  return <h3>Welcome to Track Parcel Details Page: {params.trackingId}</h3>;
}

export default TrackParcelByIdPage;
