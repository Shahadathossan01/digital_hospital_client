import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Card } from '@mui/material';
import { usePDF } from 'react-to-pdf';

const TestRecommendationModal = ({ openTest, handleCloseTest, testRecommendation }) => {
    const { toPDF, targetRef } = usePDF({ filename: 'testRecommendation.pdf' });

    const handleConfirm = () => {
        toPDF();
        handleCloseTest();
    }

    return (
        <React.Fragment>
            <Dialog
                open={openTest}
                onClose={handleCloseTest}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <div ref={targetRef}>
                        {
                            testRecommendation.length === 0
                                ? <h1>No Test Recommendations Available</h1>
                                : (
                                    <Card>
                                        <ol>
                                            {
                                                testRecommendation.map(item => (
                                                    <li key={item._id}>{item.testName}</li>
                                                ))
                                            }
                                        </ol>
                                    </Card>
                                )
                        }
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseTest} variant="outlined">
                        Cancel
                    </Button>
                    <Button 
                        onClick={handleConfirm} 
                        variant="contained" 
                        color="primary" 
                        disabled={testRecommendation.length === 0}
                    >
                        Download
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default TestRecommendationModal;
