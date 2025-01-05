import { useRef, useState } from "react";
import { Label } from "@/Components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { Button } from "@/Components/ui/button";
import { User } from "@/types";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/Components/ui/dialog";
import { router } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import { useToast } from "@/hooks/use-toast"



export default function UpdateProfilePhoto({ user }: { user?: User }) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [showDialog, setShowDialog] = useState(false);
    const [photoFile, setPhotoFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [photoError, setPhotoError] = useState<string | null>(null);

    const { toast } = useToast();

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleClose = () => {
        setShowDialog(false);
        setPhotoFile(null);
        setPreviewUrl(null);
        setPhotoError(null);
        URL.revokeObjectURL(previewUrl || "");
    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            const validTypes = ["image/jpeg", "image/jpg", "image/png"];
            const maxSize = 2 * 1024 * 1024; // 5MB

            if (!validTypes.includes(selectedFile.type)) {
                setPhotoError("Invalid file type. Only JPEG, JPG, and PNG are allowed.");
                return;
            }

            if (selectedFile.size > maxSize) {
                setPhotoError("File size exceeds the 2MB limit.");
                return;
            }

            setPhotoError(null); // Clear any previous errors
            setPhotoFile(selectedFile);

            const reader = new FileReader();
            reader.onload = () => {
                setPreviewUrl(reader.result as string);
                setShowDialog(true);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const uploadPhoto = () => {
        const formData = new FormData();
        formData.append("photo", photoFile as Blob);
        router.post(route("profile.update-photo"), formData, {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                setShowDialog(false);
                setPhotoFile(null);
                setPreviewUrl(null);

                toast({
                    title: "Profile photo updated successfully",
                    description: "Your profile photo has been updated successfully.",
                });
            },
            onError: (errors) => {
                setPhotoError(errors.photo);
            },
        });
    };

    return (
        <div>
            <Label htmlFor="photo">Profile Photo</Label>
            <input
                type="file"
                onChange={handlePhotoChange}
                id="photo"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
            />
            <div className="mt-2 flex items-center gap-4">
                <Avatar className="h-12 w-12">
                    <AvatarImage src={user?.photo_url} alt={user?.name} />
                    <AvatarFallback>{user?.name.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                    <Button variant={"outline"} type="button" onClick={handleButtonClick}>
                        Change Profile Photo
                    </Button>
                </div>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
                Only *.jpeg, *.jpg and *.png files under 2MB are accepted
            </p>

            {photoError && <InputError message={photoError} className="mt-2" />}

            <Dialog open={showDialog} onOpenChange={setShowDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Change Profile Photo</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                        {previewUrl && (
                            <div className="flex items-center justify-center">
                                <Avatar className="h-48 w-48">
                                    <AvatarImage src={previewUrl} alt={user?.name} />
                                    <AvatarFallback>{user?.name.charAt(0).toUpperCase()}</AvatarFallback>
                                </Avatar>
                            </div>
                        )}
                    </div>
                    <DialogFooter>
                        <Button variant={"secondary"} type="button" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button onClick={uploadPhoto}>Save</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
