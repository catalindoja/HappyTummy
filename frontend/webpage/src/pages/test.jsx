import React, { useState, useContext } from "react";
import { useEffect } from "react";
import { AuthContext } from "../context/authContext";
import { useLocation, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useTranslation } from 'react-i18next';
import axios from "axios";
import moment from "moment";