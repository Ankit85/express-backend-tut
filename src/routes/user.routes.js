import { Router } from "express";
import {
  changePassword,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  currentUser,
  updateAccountDetails,
  updateAvatar,
  updateCoverImage,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  registerUser
);

router.route("/login").post(loginUser);

//secure password
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-password").post(verifyJWT, changePassword);
router.route("/current-user").post(verifyJWT, currentUser);
router.route("/update-user").post(verifyJWT, updateAccountDetails);
router
  .route("/update-avatar")
  .post(
    upload.fields([{ name: "avatar", maxCount: 1 }]),
    verifyJWT,
    updateAvatar
  );
router
  .route("/update-cover-image")
  .post(
    upload.fields([{ name: "coverImage", maxCount: 1 }]),
    verifyJWT,
    updateCoverImage
  );

export default router;
