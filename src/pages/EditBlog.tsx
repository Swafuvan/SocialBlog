import React, { useContext, useRef, useState } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
} from "@nextui-org/react";
import { userContext } from "./Provider";
import { DeleteBlogs, EditBlogs } from "@/lib/routes/userRoutes";
import { useNavigate } from "react-router-dom";

// Main Component
export const PostEditModal: React.FC<any> = ({ singlePost, handleCLose, setBlogs }) => {

    const [deleteConfirmation, setDeleteConfirmation] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const { user } = useContext<any>(userContext);
    const navigate = useNavigate();

    const handleClose = () => {
        setOpenEdit(false);
    }

    const handleDeleteBlog = async (BlogData: any) => {
        const deletedBlog = await DeleteBlogs(BlogData,);
        console.log(deletedBlog)
        if (deletedBlog.message === 'Deleted successfully') {
            navigate('/')
        }
    }

    return (
        <Modal
            backdrop="opaque"
            isOpen={true}
            onOpenChange={handleCLose}
            classNames={{
                backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20 ",
            }}
        >
            <ModalContent style={{ borderRadius: "20px" }} className="border-none w-96 bg-slate-200 h-fit mt-28">
                <ModalHeader className="flex items-center flex-col gap-1"> </ModalHeader>
                <ModalBody className="gap-3">
                    {/* Conditional content based on user ownership of the post */}
                    {openEdit && <EditPost handleClose={handleClose} setBlogs={setBlogs} handleCLose={handleCLose} singlePost={singlePost} />}
                    {singlePost.author._id === user?._id ? (
                        <>
                            <button onClick={() => setOpenEdit(true)} className="text-red-600">
                                Edit Post
                            </button>
                            <hr className="border-black" />
                            <button className="text-red-600" onClick={() => setDeleteConfirmation(true)}>
                                Delete Blog
                            </button>
                            <hr className="border-black" />
                        </>
                    ) : (
                        <>
                            <button className="text-red-600">Report</button>
                            <hr className="border-black" />
                            <button className="text-red-600">Unfollow</button>
                            <hr className="border-black" />
                        </>
                    )}
                </ModalBody>
                <ModalFooter className="flex flex-col justify-center px-0 py-0">
                    <Button onPress={handleCLose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
            {/* Delete Confirmation Modal */}
            {deleteConfirmation && (
                <Modal
                    backdrop="opaque"
                    isOpen={true}
                    onOpenChange={() => setDeleteConfirmation(false)}
                    classNames={{
                        backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20 ",
                    }}
                >
                    <ModalContent style={{ borderRadius: "20px" }} className="border w-96 mb-3 border-gray-400 bg-slate-200 h-fit mt-28">
                        <ModalHeader className="flex items-center flex-col">Confirm Deletion</ModalHeader>
                        <ModalBody className="text-center">
                            <p>Are you sure you want to delete this post?</p>
                        </ModalBody>
                        <ModalFooter className="flex justify-center gap-4">
                            <Button onPress={() => handleDeleteBlog(singlePost)} className="bg-gray-500">
                                Yes, Delete
                            </Button>
                            <Button onPress={() => setDeleteConfirmation(false)} className="bg-gray-400">
                                Cancel
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            )}
        </Modal>
    );
};


// Edit Post Component
const EditPost: React.FC<any> = ({ handleClose, singlePost, handleCLose, setBlogs }) => {

    const [changedData, setChangedData] = useState<string | undefined>(singlePost.content);
    const [blogTitle, setBlogTitle] = useState<string | undefined>(singlePost.title);
    const videoRef = useRef<HTMLVideoElement>(null);
    let navigate = useNavigate();


    const postContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setChangedData(e.target.value);
    };

    const blogTitleCOntent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setBlogTitle(e.target.value);
    }

    const handleEditPost = async (BlogData: any, content: any, title: any) => {
        let changedData = { BlogContent: content, BlogTitle: title }
        const EditedData = await EditBlogs(BlogData, changedData)
        if (EditedData.Blogs) {
            setBlogs((data: any) =>
                data.map((blog: any) =>
                    blog._id === BlogData._id
                        ? { ...blog, BlogContent: content, BlogTitle: title }
                        : blog
                )
            );
            handleClose()
            handleCLose()
            navigate("/");
        }

    };

    return (
        <Modal
            backdrop="opaque"
            isOpen={true}
            onOpenChange={handleClose}
            classNames={{
                backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
            }}
        >
            <ModalContent className="border border-gray-400 bg-slate-200 rounded-md h-fit">
                <>
                    <ModalHeader className="flex items-center flex-col">
                        Do you really want to edit this post?
                    </ModalHeader>
                    <ModalBody className="gap-1">
                        <textarea
                            className="md:w-6/12 sm:w-2/3 md:ml-64 mb-2 mt-1"
                            placeholder="Edit your post"
                            onChange={blogTitleCOntent}
                            value={blogTitle}
                            name="PostTitle"
                            id="PostTitle"
                            required
                        />
                        <div>
                            {singlePost?.Data?.fileType === "image" ? (
                                <div className="w-fit h-[60%] flex justify-center">
                                    <img
                                        src={singlePost?.Data?.file}
                                        alt="Post image"
                                        className="object-cover md:ml-56 h-96 w-fit"
                                    />
                                </div>
                            ) : (
                                <div className="w-full h-[70%] flex justify-center">
                                    <video ref={videoRef} src={singlePost?.Data.file} className="object-cover h-96 w-fit" />
                                </div>
                            )}
                        </div>
                        <textarea
                            className="md:w-6/12 sm:w-2/3 md:ml-64 mt-2"
                            placeholder="Edit your post"
                            onChange={postContent}
                            value={changedData}
                            name="PostContent"
                            id="PostContent"
                            required
                        />
                    </ModalBody>
                    <ModalFooter className="flex flex-col justify-center px-0 py-0">
                        <Button className="bg-slate-500" onPress={() => handleEditPost(singlePost, changedData, blogTitle)}>
                            Update
                        </Button>
                        <Button onPress={handleClose}>Cancel</Button>
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal>
    );
};
