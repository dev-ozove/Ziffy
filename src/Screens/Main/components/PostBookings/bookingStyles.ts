import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  mapContainer: {
    height: '80%', // Reserve 60% of the screen for the map
    width: '100%',
  },
  map: {
    flex: 1, // Fill the mapContainer
    ...StyleSheet.absoluteFillObject,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    marginTop: 10,
    color: '#2196F3',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  arrivalText: {
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 10,
  },

  driverInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    paddingVertical: 20,
    borderColor: '#ccc',
  },
  driverImage: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    marginRight: 12,
  },
  driverDetails: {
    flex: 1,
  },
  driverName: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 5,
  },
  carDetailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  carDetails: {
    fontSize: 14,
    color: '#313A48',
  },
  plateNumber: {
    backgroundColor: '#FFAF19',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
    color: 'black',
    fontWeight: '500',
    fontSize: 14,
  },
  ratingContainer: {
    position: 'absolute',
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    left: 11,
    bottom: 12,
    paddingHorizontal: 4,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  rating: {
    marginLeft: 2,
    fontSize: 14,
    fontWeight: 'bold',
  },
  iconsContainer: {
    flexDirection: 'row',
    gap: 15,
  },

  iconButton: {
    width: 40,
    height: 40,
    backgroundColor: '#F1F2F6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  tripDetails: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    width: '100%',
    paddingVertical: 15,
  },
  tripHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  tripLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: 'black',
  },
  shareButton: {
    paddingVertical: 5,
  },
  tripStops: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 5,
  },
  stop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressContainer: {
    marginLeft: 8,
    width: '100%',
  },
  stopText: {
    fontSize: 14,
    color: '#141921',
    marginBottom: 12,
  },
  stopText1: {
    fontSize: 14,
    color: '#141921',
  },

  paymentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,

    justifyContent: 'space-between',
  },
  paymentDetails: {
    flex: 1,
    marginLeft: 10,
  },
  paymentText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#141921',
    marginBottom: 3,
  },
  paymentSubText: {
    fontSize: 12,
    color: '#313A48',
  },
  checkInButton: {
    backgroundColor: '#F8AB1E',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  checkInText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#141921',
  },
});
