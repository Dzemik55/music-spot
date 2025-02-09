import React from "react";
import {useAuth} from "../contexts/AuthContext.tsx";
import {Box, Button, FormControl, FormLabel, TextField, Typography} from "@mui/material";
import {SubmitHandler, useForm} from "react-hook-form";
import {api} from "../api/api.ts";
import {useNavigate} from "react-router-dom";
import {AuthContainer, Card} from "../components/styled/Styled.ts";
import {LoginRequest} from "../types/Auth.ts";
import { useLocation } from "react-router-dom";


export const Login: React.FC = () => {
    const {login} = useAuth();
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<LoginRequest>()
    const navigate = useNavigate();
    const location = useLocation();
    const message = location.state?.message;

    const onSubmit: SubmitHandler<LoginRequest> = async (data) => {
        try {
            const response = await api.authenticate(data);
            login(data.usernameOrEmail, data.password, response.data);
            navigate("/")
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <AuthContainer direction="column" justifyContent="space-between">
            {message && <div className="success-message">{message}</div>}
            <Card variant="outlined">
                <Typography
                    component="h1"
                    variant="h4"
                    sx={{width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)'}}
                >
                    Sign in
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        gap: 2,
                    }}
                >
                    <FormControl>
                        <FormLabel htmlFor="usernameOrEmail">Username or Email</FormLabel>
                        <TextField
                            {...register("usernameOrEmail", {required: "Type your username or e-mail address"})}
                            error={Boolean(errors.usernameOrEmail)}
                            helperText={errors.usernameOrEmail?.message}
                            id="usernameOrEmail"
                            type="text"
                            name="usernameOrEmail"
                            fullWidth
                            variant="outlined"
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <TextField
                            {...register("password", {required: true})}
                            error={Boolean(errors.password)}
                            helperText={errors.password?.message}
                            name="password"
                            type="password"
                            id="password"
                            fullWidth
                            variant="outlined"
                        />
                    </FormControl>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                    >
                        Sign in
                    </Button>
                </Box>
            </Card>
        </AuthContainer>
    );
}