import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    height: '70%',
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
  sheetContent: {
    paddingHorizontal: 20,
  },
  titleText: {
    color: '#4A4A4A',
    fontSize: 24,
    fontWeight: 'bold',
  },

  iconContainer: {
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 5,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
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
    marginVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
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
    fontWeight: 'bold',
    color: '#4A4A4A',
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CFD3CF',
    backgroundColor: '#F0F0F0',
  },
  activeButton: {
    borderColor: '#FFAF19',
    backgroundColor: '#ffae194e',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  contactInputsContainer: {
    gap: 12,
  },
  input: {
    backgroundColor: '#F0F0F0',
    padding: 12,
    borderRadius: 8,
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
    borderRadius: 8,
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
    marginBottom: 24,
  },
  notesInput: {
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    padding: 12,
    minHeight: 100,
    textAlignVertical: 'top',
    fontSize: 16,
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
    borderRadius: 12,
  },
  selectedServiceButton: {
    backgroundColor: '#FFAF19',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
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
    padding: 16,
    backgroundColor: '#FFAF1920',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
});
