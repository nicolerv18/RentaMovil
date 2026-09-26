    import { StyleSheet } from "react-native";

    export const createStyles =(colors: any) =>
    
    StyleSheet.create({

    card: {
        backgroundColor: colors.backgroundCard,
        borderRadius: 24,
        padding: 20,
        marginBottom: 22,
        borderWidth: 1,
        borderColor: colors.border,
    },

    badge: {
        alignSelf: "flex-start",
        backgroundColor: colors.badge,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 999,
        marginBottom: 20,
    },

    badgeText: {
        color: colors.text,
        fontSize: 15,
        fontWeight: "700",
    },

    name: {
        fontSize: 28,
        fontWeight: "800",
        color: colors.text,
    },

    subtitle: {
        marginTop: 4,
        fontSize: 18,
        color: colors.text,
    },

    featuresContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
        marginTop: 22,
    },

    feature: {
        backgroundColor: colors.background,
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: 10,
    },

    featureText: {
        fontSize: 13,
        color: colors.text,
    },

    content: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 28,
    },

    benefits: {
        flex: 1,
        gap: 10,
        paddingRight: 10,
    },

    benefit: {
        fontSize: 12,
        color: colors.text,
        lineHeight: 14,
        
    },

        benefitRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 5,
    },

    check: {
    width: 24,
    fontSize: 12,
    color: colors.text,
    marginTop: 2,
    },

    benefitText: {
    flex: 1,
    fontSize: 13,
    color: colors.text,
    lineHeight: 14,
    },

    image: {
        width: 100,
        height: 60,
        padding: 30,
    },


    locationContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 28,
    },

    locationIcon: {
        width: 56,
        height: 56,
        borderRadius: 16,
        backgroundColor: colors.background,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 14,
    },

    locationInfo: {
        flex: 1,
    },

    location: {
        fontSize: 18,
        fontWeight: "600",
        color: colors.text,
    },

    locationSub: {
        marginTop: 4,
        fontSize: 14,
        color: colors.text,
    },


    footer: {
        marginTop: 30,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
    },

    recommended: {
        color: colors.success,
        fontWeight: "700",
        fontSize: 17,
        marginBottom: 12,
    },

    ratingContainer: {
        flexDirection: "row",
        gap: 10,
    },

    company: {
        backgroundColor: colors.primary,
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 10,
    },

    companyText: {
        color: colors.textBtn,
        fontWeight: "700",
        fontSize: 16,
    },

    rating: {
        backgroundColor: colors.primary,
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 10,
    },

    ratingText: {
        color: colors.textBtn,
        fontWeight: "700",
        fontSize: 16,
    },

    price: {
        fontSize: 28,
        fontWeight: "900",
        color: colors.text,
    },


    button: {
        marginTop: 28,
        backgroundColor: colors.button,
        borderRadius: 16,
        paddingVertical: 16,
        justifyContent: "center",
        alignItems: "center",
    },

    buttonText: {
        color: colors.buttonText,
        fontSize: 18,
        fontWeight: "700",
    },

    });