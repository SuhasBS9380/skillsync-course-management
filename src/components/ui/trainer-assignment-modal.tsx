import React, { useState, useEffect } from 'react';
import { X, User, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Trainer {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  age: number;
  location: string;
  experience: string;
}

interface TrainerAssignmentModalProps {
  courseId: number;
  courseTitle: string;
  isOpen: boolean;
  onClose: () => void;
  onAssign: (trainerId: number) => void;
}

export const TrainerAssignmentModal: React.FC<TrainerAssignmentModalProps> = ({
  courseId,
  courseTitle,
  isOpen,
  onClose,
  onAssign
}) => {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [loading, setLoading] = useState(false);
  const [assignedTrainers, setAssignedTrainers] = useState<number[]>([]);
  const [successMessage, setSuccessMessage] = useState<string>("");

  useEffect(() => {
    if (isOpen) {
      fetchTrainers();
      fetchAssignedTrainers();
    }
  }, [isOpen, courseId]);

  const fetchTrainers = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8081/api/admin/trainers');
      const data = await response.json();
      const formattedTrainers = data.map((trainer: any) => ({
        userId: trainer[0],
        firstName: trainer[1],
        lastName: trainer[2],
        email: trainer[3],
        phoneNumber: trainer[4],
        age: trainer[5],
        location: trainer[6],
        experience: trainer[7]
      }));
      setTrainers(formattedTrainers);
    } catch (error) {
      console.error('Error fetching trainers:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAssignedTrainers = async () => {
    try {
      const response = await fetch(`http://localhost:8081/api/admin/trainers-courses/course/${courseId}`);
      const assignments = await response.json();
      const assignedIds = assignments.map((assignment: any) => assignment.trainerUserId);
      setAssignedTrainers(assignedIds);
    } catch (error) {
      console.error('Error fetching assigned trainers:', error);
    }
  };

  const handleAssign = async (trainerId: number) => {
    try {
      const response = await fetch('http://localhost:8081/api/admin/trainers-courses/assign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          trainerUserId: trainerId,
          courseId: courseId
        })
      });

      if (response.ok) {
        const assignedTrainer = trainers.find(t => t.userId === trainerId);
        setSuccessMessage(`Successfully assigned ${assignedTrainer?.firstName} ${assignedTrainer?.lastName} to the course!`);
        setAssignedTrainers([trainerId]); // Only one trainer per course
        onAssign(trainerId);
        // Show success message and close modal
        setTimeout(() => {
          setSuccessMessage("");
          onClose();
        }, 2000);
      } else {
        console.error('Failed to assign trainer');
      }
    } catch (error) {
      console.error('Error assigning trainer:', error);
    }
  };



  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[80vh] overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="text-xl font-bold">
              {assignedTrainers.length > 0 ? "Change Course Trainer" : "Assign Trainer to Course"}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{courseTitle}</p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="overflow-y-auto max-h-[60vh]">
          {successMessage && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
              {successMessage}
            </div>
          )}
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-muted-foreground">Loading trainers...</div>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {trainers.map((trainer) => {
                const isAssigned = assignedTrainers.includes(trainer.userId);
                return (
                  <Card key={trainer.userId} className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <h3 className="font-semibold">
                            {trainer.firstName} {trainer.lastName}
                          </h3>
                          {isAssigned && (
                            <Badge variant="secondary" className="text-xs">
                              Assigned
                            </Badge>
                          )}
                        </div>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-2">
                            <Mail className="h-3 w-3" />
                            <span>{trainer.email}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Phone className="h-3 w-3" />
                            <span>{trainer.phoneNumber}</span>
                          </div>
                          <div>
                            <span className="font-medium">Location:</span> {trainer.location}
                          </div>
                          <div>
                            <span className="font-medium">Experience:</span> {trainer.experience}
                          </div>
                        </div>
                      </div>
                      <div className="ml-4">
                        {!isAssigned ? (
                          <Button
                            size="sm"
                            onClick={() => handleAssign(trainer.userId)}
                            className="bg-primary hover:bg-primary/90"
                          >
                            {assignedTrainers.length > 0 ? "Change to" : "Assign"}
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            disabled
                            className="text-muted-foreground"
                          >
                            Currently Assigned
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}; 