import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import {AuthContainer, Card} from '../components/styled/Styled';
import {SubmitHandler, useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {api} from "../api/api.ts";
import {SignUpRequest} from "../types/Auth.ts";

export const SignUp: React.FC = () => {

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<SignUpRequest>()

    const navigate = useNavigate();

    const onSubmit: SubmitHandler<SignUpRequest> = async (data) => {
        try {
            await api.signUp(data);
            navigate("/login", { state: { message: "Registration successful! You can now log in using your login credentials." } });
        } catch (error) {
            console.error(error);
        }
    }

    return (
            <AuthContainer direction="column" justifyContent="space-between">
                <Card variant="outlined">
                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
                    >
                        Sign up
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit(onSubmit)}
                        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                    >
                        <FormControl>
                            <FormLabel htmlFor="name">Name</FormLabel>
                            <TextField
                                type="text"
                                fullWidth
                                id="name"
                                placeholder="Enter your name here..."
                                {...register("name", {required: "Enter your name"})}
                                error={Boolean(errors.name)}
                                helperText={errors.name?.message}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="username">Username</FormLabel>
                            <TextField
                                type="text"
                                fullWidth
                                id="username"
                                placeholder="Enter your username here..."
                                {...register("username", {required: "Enter your username"})}
                                error={Boolean(errors.username)}
                                helperText={errors.username?.message}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <TextField
                                fullWidth
                                type="email"
                                id="email"
                                placeholder="Enter your e-mail here..."
                                variant="outlined"
                                {...register("email", {required: "Enter your e-mail"})}
                                error={Boolean(errors.email)}
                                helperText={errors.email?.message}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <TextField
                                fullWidth
                                placeholder="••••••"
                                type="password"
                                id="password"
                                variant="outlined"
                                {...register("password", {required: "Enter your password"})}
                                error={Boolean(errors.password)}
                                helperText={errors.password?.message}
                            />
                        </FormControl>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                        >
                            Sign up
                        </Button>
                    </Box>
                    <Divider>
                        <Typography sx={{ color: 'text.secondary' }}>or</Typography>
                    </Divider>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Typography sx={{ textAlign: 'center' }}>
                            Already have an account?{' '}
                            <Link
                                variant="body2"
                                sx={{ alignSelf: 'center' }}
                            >
                                Sign in
                            </Link>
                        </Typography>
                    </Box>
                </Card>
            </AuthContainer>
    );
}