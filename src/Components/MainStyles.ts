import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 90, // Adjust based on spacing
  },
  iconButtonFinal: {
    top: 8,
    backgroundColor: '#FFF3DC',
    width: 40,
    height: 40,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    height: '90%',
  },
  actionSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    elevation: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  sheetHandle: {
    width: 100,
    height: 5,
    backgroundColor: '#333',
    borderRadius: 2.5,
    alignSelf: 'center',
    marginVertical: 10,
  },
  profileButton: {
    position: 'absolute',
    top: 60,
    left: 10,
    flexDirection: 'row',
    gap: 10,
  },
  sheetContainer: {flex: 1, paddingBottom: 200},
  sheetContent: {
    paddingHorizontal: 10,
  },
  titleText: {
    fontFamily: 'DMSans36pt-ExtraBold',
    color: '#141921',
    fontSize: 24,
    marginBottom: 10,
  },

  iconContainer: {
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
  },

  nextButton: {
    padding: 10,
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#FFAF19',
    marginVertical: 10,
  },
  nextButtonText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 20,
  },
  sampleDataContainer: {
    marginTop: 20,
  },
  sampleDataItem: {
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#F8F8F8',
    marginVertical: 5,
  },
  sampleDataText: {
    fontSize: 16,
    color: '#333',
  },
  datecontainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  picker: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    width: '45%',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  icon: {
    fontSize: 18,
    marginRight: 8,
  },
  arrow: {
    fontSize: 16,
    color: '#666',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    maxHeight: '60%',
  },
  timeItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },

  suggestionsList_dropoff: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    maxHeight: 200,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    zIndex: 1000,
  },

  inputRow: {
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#F0F0F0',
    borderRadius: 5,
  },

  inputField: {
    borderWidth: 1,
    borderColor: 'transparent',
    padding: 12,
    borderEndStartRadius: 20,
    borderEndEndRadius: 20,
    backgroundColor: '#F0F0F0',
    fontSize: 16,
  },
  suggestionsList: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    maxHeight: 200,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 1000,
    marginTop: 5,
  },
  suggestionItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  suggestionText: {
    fontSize: 14,
    color: '#333',
  },
  Container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  backButton: {
    marginBottom: 16,
  },
  scrollView: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontFamily: 'DMSans36pt-ExtraBold',
    color: '#000',
    marginBottom: 10,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'DMSans36pt-SemiBold',
    marginBottom: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#CFD3CF',
    backgroundColor: '#F0F0F0',
  },
  activeButton: {
    borderColor: '#FFAF19',
    backgroundColor: '#ffae194e',
  },
  buttonText: {
    fontSize: 12,
    fontFamily: 'DMSans36pt-Medium',
  },
  contactInputsContainer: {
    gap: 10,
  },
  card: {
    backgroundColor: '#ffae194e',
    borderRadius: 5,
    padding: 15,
    borderWidth: 1,
    borderColor: '#FFAF19',
    marginBottom: 10,
  },
  header: {
    fontSize: 20,
    fontFamily: 'DMSans36pt-SemiBold',
    marginBottom: 10,
    color: '#000',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer1: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  personalText: {
    fontSize: 16,
    fontFamily: 'DMSans36pt-SemiBold',
    color: '#7D7B7B',
    fontWeight: '500',
  },
  cardText: {
    fontSize: 14,
    fontFamily: 'DMSans36pt-Regular',
    color: '#8C8B8B',
  },
  input: {
    backgroundColor: '#F0F0F0',
    padding: 12,
    borderRadius: 5,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#6B6B6B',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  savedContactContainer: {
    backgroundColor: '#F0F0F0',
    borderRadius: 5,
    padding: 12,
    marginTop: 8,
  },
  savedContactInfo: {
    gap: 4,
  },
  savedContactText: {
    fontSize: 16,
    fontWeight: '500',
  },
  savedContactPhone: {
    fontSize: 14,
    color: '#666',
  },
  paymentSection: {
    marginBottom: 24,
  },
  paymentButton: {
    backgroundColor: '#FFF9F0',
    borderRadius: 8,
    padding: 16,
  },
  paymentContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  paymentIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFAF19',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentIconText: {
    fontSize: 18,
  },
  paymentType: {
    fontSize: 16,
    fontWeight: '600',
  },
  paymentDetail: {
    fontSize: 14,
    color: '#666',
  },
  chevron: {
    fontSize: 24,
    color: '#666',
  },
  notesContainer: {
    marginBottom: 10,
    borderColor: '#D3D3D3',
    borderWidth: 1,
    borderRadius: 5,
  },
  container1: {
    backgroundColor: '#F0F0F0',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    paddingVertical: 14,
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  input1: {
    fontSize: 14,
    fontFamily: 'DMSans36pt-Medium',
    color: '#000',
  },
  notesInput: {
    backgroundColor: '#F0F0F0',
    borderRadius: 5,
    padding: 12,
    minHeight: 100,
    textAlignVertical: 'top',
    fontFamily: 'DMSans36pt-Medium',
    fontSize: 14,
  },
  reviewButton: {
    backgroundColor: '#FFAF19',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 24,
  },
  reviewButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export const Styles = StyleSheet.create({
  hourButton: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
  },
  serviceButton: {
    padding: 16,
    borderWidth: 1,
    backgroundColor: 'transparent',
    borderColor: '#d7d7d7',
    borderRadius: 5,
  },
  selectedServiceButton: {
    backgroundColor: '#FFEFC5',
    borderRadius: 5,
    borderColor: '#FFAF19',
  },
  serviceContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  serviceTitle: {
    fontWeight: 'bold',
    color: '#666',
  },
  serviceSubtitle: {
    color: '#666',
    fontSize: 12,
    fontWeight: '400',
  },
  servicePrice: {
    fontWeight: '600',
    color: '#666',
  },
  selectedText: {
    color: '#000',
  },
  serviceDetailsContainer: {
    backgroundColor: '#FFAF1920',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
});
