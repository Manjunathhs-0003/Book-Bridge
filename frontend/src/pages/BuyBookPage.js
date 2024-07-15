import React, { useEffect, useState, useContext } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import { BackgroundBeams } from '../components/ui/background-beams';
import { FlipWords } from '../components/ui/flip-words';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { cn } from '../utils/cn';

const BuyBookPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const { user: currentUser } = useContext(AuthContext);
  const [purchaseType, setPurchaseType] = useState("buy"); // State for purchase type
  const [rentalDuration, setRentalDuration] = useState(""); // Rental duration state
  const [calculatedRentalPrice, setCalculatedRentalPrice] = useState(0); // State to hold the calculated rental price

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/books/${id}`);
        console.log('Response data:', response.data);

        if (response.data && response.data.book && response.data.owner && response.data.owner.contactDetails) {
          setBook(response.data);
        } else {
          console.error('Unexpected response structure:', response.data);
        }
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    fetchBookDetails();
  }, [id]);

  useEffect(() => {
    console.log('Book state has changed:', book);
  }, [book]);

  const handlePurchaseTypeChange = (e) => {
    setPurchaseType(e.target.value);
    setRentalDuration("");
    setCalculatedRentalPrice(0);
  };

  const handleRentalDurationChange = (e) => {
    const duration = e.target.value;
    setRentalDuration(duration);
    if (book && book.book.fixedPrice) {
      const rentalPrice = (book.book.fixedPrice / 2) * parseInt(duration);
      setCalculatedRentalPrice(rentalPrice.toFixed(2));
    }
  };

  if (!book) {
    return <div>Loading...</div>;
  }

  const words = currentUser ? [currentUser.username, 'Buying'] : ['Buying'];

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <BackgroundBeams className="fixed inset-0 z-0 h-full w-full" />
      <div className="relative z-10 container mx-auto p-4 text-center space-y-8">
        <div className="text-6xl mx-auto font-normal text-neutral-600 dark:text-neutral-400">
          <FlipWords words={words} className="inline-block yatra-one-regular text-center" />
        </div>
        <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-neutral-900 yatra-one-regular dark:bg-black">
          <h2 className="font-bold text-xl text-white dark:text-neutral-200">Book Details</h2>
          <p className="text-neutral-400 text-sm mt-2 max-w-sm dark:text-neutral-300">Find below the details of the book you're purchasing...</p>
          <div className="my-8 space-y-4">
            <LabelInputContainer>
              <Label>Title</Label>
              <Input
                type="text"
                value={book.book.title} 
                readOnly
                className="w-80 p-2 bg-neutral-800 shadow-input text-white border border-gray-600 rounded"
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label>Author</Label>
              <Input
                type="text"
                value={book.book.author} 
                readOnly
                className="w-80 p-2 bg-neutral-800 shadow-input text-white border border-gray-600 rounded"
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label>Description</Label>
              <Input
                type="text"
                value={book.book.details || 'No Description'} 
                readOnly
                className="w-80 p-2 bg-neutral-800 shadow-input text-white border border-gray-600 rounded"
              />
            </LabelInputContainer>
          </div>
        </div>
        <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-neutral-900 yatra-one-regular dark:bg-black">
          <h2 className="font-bold text-xl text-white dark:text-neutral-200">Contact Seller</h2>
          <div className="my-8 space-y-4">
            <LabelInputContainer>
              <Label>Email</Label>
              <Input
                type="text"
                value={book.owner.email}
                readOnly
                className="w-80 p-2 bg-neutral-800 shadow-input text-white border border-gray-600 rounded"
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label>Username</Label>
              <Input
                type="text"
                value={book.owner.username}
                readOnly
                className="w-80 p-2 bg-neutral-800 shadow-input text-white border border-gray-600 rounded"
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label>Phone</Label>
              <Input
                type="text"
                value={book.owner.contactDetails.phone || 'No Phone'} 
                readOnly
                className="w-80 p-2 bg-neutral-800 shadow-input text-white border border-gray-600 rounded"
              />
            </LabelInputContainer>
          </div>
        </div>
        <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-neutral-900 yatra-one-regular dark:bg-black">
          <h2 className="font-bold text-xl text-white dark:text-neutral-200">Purchase or Rent</h2>
          <div className="my-4 space-y-4">
            <LabelInputContainer>
              <Label>Do you want to buy or rent?</Label>
              <select
                value={purchaseType}
                onChange={handlePurchaseTypeChange}
                className="w-80 p-2 bg-neutral-800 shadow-input text-white border border-gray-600 rounded"
              >
                <option value="buy">Buy</option>
                <option value="rent">Rent</option>
              </select>
            </LabelInputContainer>

            {purchaseType === 'buy' && (
              <LabelInputContainer>
                <Label>Fixed Price</Label>
                <Input
                  type="text"
                  value={book.book.fixedPrice}
                  readOnly
                  className="w-80 p-2 bg-neutral-800 shadow-input text-white border border-gray-600 rounded"
                />
              </LabelInputContainer>
            )}

            {purchaseType === 'rent' && (
              <>
                <LabelInputContainer>
                  <Label>Rental Duration (in months)</Label>
                  <Input
                    type="number"
                    value={rentalDuration}
                    onChange={handleRentalDurationChange}
                    placeholder="Enter the duration (e.g., 1 month)"
                    className="w-80 p-2 bg-neutral-800 shadow-input text-white border border-gray-600 rounded"
                  />
                </LabelInputContainer>
                <LabelInputContainer>
                  <Label>Rental Price</Label>
                  <Input
                    type="text"
                    value={calculatedRentalPrice}
                    readOnly
                    className="w-80 p-2 bg-neutral-800 shadow-input text-white border border-gray-600 rounded"
                  />
                </LabelInputContainer>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return <div className={cn("flex flex-col space-y-2 items-start", className)}>{children}</div>;
};

export default BuyBookPage;