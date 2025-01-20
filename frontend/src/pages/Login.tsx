import React from "react";
import {useAuth} from "../contexts/AuthContext.tsx";
import {Box, Button, FormControl, FormLabel, Stack, styled, TextField, Typography} from "@mui/material";
import MuiCard from '@mui/material/Card';
import {SubmitHandler, useForm} from "react-hook-form";
import {api} from "../api/api.ts";
import {useNavigate} from "react-router-dom";

type LoginInputs = {
    usernameOrEmail: string,
    password: string
}

const Card = styled(MuiCard)(({theme}) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
        maxWidth: '450px',
    },
    boxShadow:
        'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    ...theme.applyStyles('dark', {
        boxShadow:
            'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
}));

const SignInContainer = styled(Stack)(({theme}) => ({
    // height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
    minHeight: '100%',
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(4),
    },
}));

export const Login: React.FC = () => {
    const {login} = useAuth();
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<LoginInputs>()
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
        try {
            const response = await api.authenticate(data);
            login(data.usernameOrEmail, data.password, response.data);
            navigate("/")
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <SignInContainer direction="column" justifyContent="space-between">
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
        </SignInContainer>
    );
}