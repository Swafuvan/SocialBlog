import { useContext, useState } from "react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { Label } from "../components/ui/label"
import { Card, CardContent } from "../components/ui/card"
import { Formik, ErrorMessage, Form, Field } from "formik"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../components/ui/dialog"
import { X } from 'lucide-react'
import { BlogCreateSchema } from "@/lib/validation/validation"
import { BlogData } from "@/types/type"
import { UploadUserBlog } from "@/lib/routes/userRoutes"
import { uploadToS3Bucket } from "@/helpers/AWS"
import { userContext } from "./Provider"
import { useNavigate } from "react-router-dom"


interface MediaItem {
    filetype: 'image' | 'video'
    file: any
}

export default function BlogCreatePage() {

    const { user } = useContext<any>(userContext);
    const navigate = useNavigate()
    const [media, setMedia] = useState<MediaItem[]>([]);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [formikValues, setFormikValues] = useState<BlogData | null>(null);
    const [progress, setProgress] = useState(-1)

    const handleMediaUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
        //     const reader = new FileReader();
        //     reader.onloadend = () => {
                const newMedia: MediaItem = {
                    filetype: file.type.startsWith("image") ? "image" : "video",
                    file: file,
                };
                setMedia([...media, newMedia]);
        //     };
        //     reader.readAsDataURL(file);
        }
    };

    const removeMedia = (index: number) => {
        const newMedia = [...media];
        newMedia.splice(index, 1);
        setMedia(newMedia);
    };

    const uploadMediaToS3getlink = async () => {
        const uploadedMedia = await Promise.all(
            media.map(async (mediaItem: MediaItem) => {
                const datas = mediaItem.file
                console.log(datas,mediaItem)
                // const fileName = `${Date.now()}.${mediaItem.filetype === 'image' ? 'jpg' : 'mp4'}`;
                const uploadedUrl = await uploadToS3Bucket(datas, setProgress);
                return { filetype: mediaItem.filetype, file: uploadedUrl };
            })
        );
        return uploadedMedia;
    };

    const submitPost = async (values: any) => {
        let blogData = { ...values };
        console.log(blogData);
        if (media.length > 0) {
            console.log(blogData, 'enter files side');
            // Upload media if available
            const uploadedMedia = await uploadMediaToS3getlink();
            blogData = { ...blogData, Data: uploadedMedia };
            const uploadedBlog = await UploadUserBlog(blogData, user._id);
            console.log("Blog uploaded successfully:", blogData);
            setMedia([]);
            setProgress(-1);
            navigate('/');
        } else {
            console.log(blogData + "enter here")
            blogData = { ...blogData, Data: [] }; // No media added
            const uploadedBlog = await UploadUserBlog(blogData, user._id);
            console.log("Blog uploaded successfully:", blogData);
            navigate('/');
        }

    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Create a New Blog Post</h1>

            <Formik
                initialValues={{
                    title: '',
                    content: '',
                    
                }}
                validationSchema={BlogCreateSchema}
                onSubmit={async (values, { resetForm }) => {
                    if (media.length === 0) {
                        // Show confirmation dialog if no media is added
                        setFormikValues(values);
                        setShowConfirmDialog(true);
                    } else {
                        // If media is added, proceed with uploading
                        await submitPost(values);
                        resetForm();
                    }
                }}
            >
                {({ values, handleChange, handleBlur, touched, errors }) => (
                    <Form className="space-y-6">
                        <div>

                            <Label htmlFor="title">Title</Label>
                            <Field
                                id="title"
                                name="title"
                                as={Input}
                                value={values.title}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={touched.title && errors.title ? 'border-red-500' : ''}
                                required
                            />
                            <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />
                        </div>
                        <div>
                            <Label htmlFor="content">Content</Label>
                            <Field
                                id="content"
                                name="content"
                                as={Textarea}
                                value={values.content}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`${touched.content && errors.content ? 'border-red-500' : ''} min-h-[200px]`}
                                required
                            />
                            <ErrorMessage name="content" component="div" className="text-red-500 text-sm" />
                        </div>

                        <div>
                            {progress > 0 && (
                                <>
                                    <span className="mb-2 text-sm font-medium text-gray-700">{progress}%</span>
                                    <progress
                                        value={progress}
                                        max="100"
                                        className="w-full h-4 bg-gray-200 rounded-lg overflow-hidden appearance-none"
                                    >
                                        {progress}%
                                    </progress>
                                </>
                            )}
                            <Label htmlFor="media">Add Image or Video</Label>
                            <Input
                                id="media"
                                type="file"
                                accept="image/*,video/*"
                                onChange={handleMediaUpload}
                                className="mb-4"
                            />
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {media.map((item: MediaItem, index: number) => (
                                    <Card key={index} className="relative">
                                        <CardContent className="p-2">
                                            {item.filetype === 'image' ? (
                                                <img src={URL.createObjectURL(item.file)} alt="Uploaded content" className="w-full h-60 object-cover" />
                                            ) : (
                                                <video src={URL.createObjectURL(item.file)} className="w-full h-60 object-cover" controls />
                                            )}
                                            <Button
                                                variant="destructive"
                                                size="icon"
                                                className="absolute top-2 right-2"
                                                onClick={() => removeMedia(index)}
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>

                        <Button type="submit" className="w-full">Publish Post</Button>
                    </Form>
                )}
            </Formik>

            <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>No Media Added</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to publish this post without any images or
                            videos?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
                            Cancel
                        </Button>
                        <Button
                            onClick={async () => {
                                setShowConfirmDialog(false);
                                if (formikValues) {
                                    await submitPost({
                                        title: formikValues.title,
                                        content: formikValues.content,
                                    });
                                    setFormikValues(null);
                                }
                            }}
                        >
                            Publish Without Media
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}